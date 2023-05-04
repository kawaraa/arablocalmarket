"use client";
import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ onLoadContent, setLoading, ready }) {
  const itemsRef = useRef([]);
  const doneRef = useRef(false);

  const onRemoveItem = (index) => {
    itemsRef.current.splice(index, 1);
  };

  const fetchContent = async (prams) => {
    setLoading(true);
    const data = await onLoadContent(prams);
    if (prams) itemsRef.current = data || [];
    else if (data && data[0]) itemsRef.current = itemsRef.current.concat(data);
    else doneRef.current = true;
    setLoading(false);
  };

  const handleScrollEvent = async () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop !== offsetHeight || doneRef.current) return;
    await fetchContent();
  };

  useEffect(() => {
    if (ready) fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: itemsRef.current, removeItem: onRemoveItem, refresh: fetchContent };
}

// NOTE: This approach is not working
// export default function useInfiniteScroll({ onLoadContent, setLoading, ready }) {
//   const [data, setData] = useState([]);
//   const [load, setLoad] = useState(true);
//   const [done, setDone] = useState(false);

//   const onRemoveItem = (index) => {
//     setData(data.filter((_, i) => i != index));
//   };

//   const fetchContent = async (prams) => {
//     setLoading(true);
//     const data = await onLoadContent(prams);
//     if (prams) setData(data || []);
//     else if (data && data[0]) setData(data.concat(data));
//     else setDone(true);
//     setLoading(false);
//     setLoad(false);
//   };

//   const handleScrollEvent = async () => {
//     const { scrollTop, offsetHeight } = document.documentElement;
//     if (window.innerHeight + scrollTop !== offsetHeight || done) return;
//     setLoad(true);
//   };

//   useEffect(() => {
//     if (ready && load) fetchContent();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ready, load]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScrollEvent);
//     return () => window.removeEventListener("scroll", handleScrollEvent);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return { data, removeItem: onRemoveItem, refresh: fetchContent };
// }
