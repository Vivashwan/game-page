"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [range, setRange] = useState({ start: null, end: null }); // confirmed rental dates
  const [pickerOpen, setPickerOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const timer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const value = useMemo(() => {
    const days = range.start && range.end ? Math.round((range.end - range.start) / 864e5) : 0;
    return {
      range,
      days,
      setRange,
      pickerOpen,
      openPicker: () => setPickerOpen(true),
      closePicker: () => setPickerOpen(false),
      toast,
    };
  }, [range, pickerOpen, toast]);

  return (
    <AppContext.Provider value={value}>
      {children}
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export const shortDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
export const longDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
