"use client";
import { useEffect, useRef } from "react";

export default function infiniteScroll({ onLoadContent, setLoading, params }) {
  const itemsRef = useRef([]);
  const doneRef = useRef(false);

  const fetchContent = async () => {
    setLoading(true);
    const data = await onLoadContent();
    if (data && data[0]) itemsRef.current = itemsRef.current.concat(data);
    else doneRef.current = true;
    setLoading(false);
  };

  const handleScrollEvent = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    // scrollTop > 400 ? setTopBtn(true) : setTopBtn(false);
    if (window.innerHeight + scrollTop !== offsetHeight || doneRef.current) return;
    fetchContent();
  };

  useEffect(() => {
    if (params) fetchContent(params);
  }, [params]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return itemsRef.current;
}
