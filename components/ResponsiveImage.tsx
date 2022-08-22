export default function ResponsiveImage(props: any): JSX.Element {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} />
  );
}
