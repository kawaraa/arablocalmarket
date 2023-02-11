// For more info on how to dynamically change the title https://beta.nextjs.org/docs/guides/seo
export default function StoreById(props) {
  console.log(props);
  return (
    <div>
      <h1>Hello from public store by ID page!</h1>
      <p>Here will show the store by ID to the public.</p>
    </div>
  );
}
