"use client";
import { useEffect, useRef } from "react";

export default function infiniteScroll({ onLoadContent, setLoading, ready }) {
  const itemsRef = useRef([]);
  const doneRef = useRef(false);

  const fetchContent = async (prams) => {
    setLoading(true);
    const data = await onLoadContent(prams);
    if (prams) itemsRef.current = data || [];
    else if (data && data[0]) itemsRef.current = itemsRef.current.concat(data);
    else doneRef.current = true;
    setLoading(false);
  };

  const handleScrollEvent = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop !== offsetHeight || doneRef.current) return;
    fetchContent();
  };

  useEffect(() => {
    if (ready) fetchContent();
  }, [ready]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return { data: itemsRef.current, refresh: fetchContent };
}
