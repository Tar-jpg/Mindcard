"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cardById } from "./cards";
import { getAmbient } from "./sound";

export interface HistoryEntry {
  ts: number; // epoch ms
  before: number; // energy 0–100
  after: number; // energy 0–100
  cardId: string;
  cardTitle: string;
  moodId: string; // mood before
  afterMoodId: string; // mood after
}

interface SessionState {
  moodId: string | null;
  moodBefore: number | null;
  cardId: string | null;
  moodAfterId: string | null;
  moodAfter: number | null;
}

interface SessionCtx extends SessionState {
  history: HistoryEntry[];
  soundOn: boolean;
  setMoodBefore: (moodId: string, energy: number) => void;
  selectCard: (cardId: string) => void;
  setMoodAfter: (moodId: string, energy: number) => void;
  commit: () => HistoryEntry | null;
  resetFlow: () => void;
  toggleSound: () => void;
}

const Ctx = createContext<SessionCtx | null>(null);
const LS_HISTORY = "mindcard.history.v2";

const empty: SessionState = {
  moodId: null,
  moodBefore: null,
  cardId: null,
  moodAfterId: null,
  moodAfter: null,
};

// Seed a believable 2-week history so the dashboard tells a story on first open.
function seedHistory(): HistoryEntry[] {
  const seeds: Array<[number, number, number, string, string, string, string]> = [
    // daysAgo, before, after, cardId, cardTitle, moodBefore, moodAfter
    [13, 24, 58, "box-breath", "หายใจสี่เหลี่ยม", "overwhelmed", "meh"],
    [12, 30, 62, "ground-54321", "5-4-3-2-1 ดึงใจกลับ", "anxious", "okay"],
    [10, 28, 42, "self-soothe", "ปลอบใจด้วย 5 ผัสสะ", "heavy", "heavy"],
    [9, 35, 70, "breath-478", "หายใจ 4-7-8 ก่อนหลับ", "anxious", "okay"],
    [7, 22, 32, "cold-reset", "รีเซ็ตด้วยความเย็น", "overwhelmed", "anxious"],
    [6, 42, 74, "body-scan", "สแกนร่างกายเบา ๆ", "meh", "okay"],
    [4, 38, 72, "box-breath", "หายใจสี่เหลี่ยม", "heavy", "okay"],
    [3, 33, 56, "ground-54321", "5-4-3-2-1 ดึงใจกลับ", "anxious", "meh"],
    [1, 45, 86, "breath-478", "หายใจ 4-7-8 ก่อนหลับ", "okay", "calm"],
  ];
  const day = 86400000;
  const now = Date.now();
  return seeds.map(([d, b, a, id, title, mood, after]) => ({
    ts: now - d * day + 13 * 3600000,
    before: b,
    after: a,
    cardId: id,
    cardTitle: title,
    moodId: mood,
    afterMoodId: after,
  }));
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>(empty);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_HISTORY);
      if (raw) {
        setHistory(JSON.parse(raw));
      } else {
        const seeded = seedHistory();
        setHistory(seeded);
        localStorage.setItem(LS_HISTORY, JSON.stringify(seeded));
      }
    } catch {
      setHistory(seedHistory());
    }
  }, []);

  const persist = useCallback((next: HistoryEntry[]) => {
    setHistory(next);
    try {
      localStorage.setItem(LS_HISTORY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const setMoodBefore = useCallback((moodId: string, energy: number) => {
    setState((s) => ({ ...s, moodId, moodBefore: energy }));
  }, []);

  const selectCard = useCallback((cardId: string) => {
    setState((s) => ({ ...s, cardId }));
  }, []);

  const setMoodAfter = useCallback((moodId: string, energy: number) => {
    setState((s) => ({ ...s, moodAfterId: moodId, moodAfter: energy }));
  }, []);

  const commit = useCallback((): HistoryEntry | null => {
    if (
      state.cardId == null ||
      state.moodBefore == null ||
      state.moodAfter == null
    ) {
      return null;
    }
    const card = cardById(state.cardId);
    const entry: HistoryEntry = {
      ts: Date.now(),
      before: state.moodBefore,
      after: state.moodAfter,
      cardId: state.cardId,
      cardTitle: card?.title ?? "การ์ดฝึกใจ",
      moodId: state.moodId ?? "meh",
      afterMoodId: state.moodAfterId ?? "meh",
    };
    persist([...history, entry]);
    return entry;
  }, [state, history, persist]);

  const resetFlow = useCallback(() => setState(empty), []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      const amb = getAmbient();
      if (next) amb.start();
      else amb.stop();
      return next;
    });
  }, []);

  const value: SessionCtx = {
    ...state,
    history,
    soundOn,
    setMoodBefore,
    selectCard,
    setMoodAfter,
    commit,
    resetFlow,
    toggleSound,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): SessionCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
