type SectionHeadingProps = {
  title: string;
  description: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="pb-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
    </div>
  );
}
