import * as React from "react";
import StarIcon from "@mui/icons-material/Star";

export interface IReviewCardProps {
    item:string
}

export default function ReviewCard({item}: IReviewCardProps) {
  return (
    <div className="w-full h-auto mb-12">
      {/* Top */}
      <div className="w-full flex items-center h-auto">
        {Array.from(new Array(5)).map((item: any, index: any) => (
          <StarIcon key={index} className="text-base"/>
        ))}
        <h1 className="ml-3 md:text-base text-[15px] text-gray-400 font-medium">{item}</h1>
      </div>

      {/* bottom Text */}
      <h1 className="mt-3 font-medium">I really like them they’re unique plus they stand out they speak for themselves</h1>
    </div>
  );
}
