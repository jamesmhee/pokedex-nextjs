import CustomButton from "@/app/components/CustomButton";
import React from "react";

type Props = {};

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      {params.slug}
      <CustomButton type={"dashed"} text={"Hello"} />
    </div>
  );
};

export default page;
