import * as React from "react";
import ThirdBoxCard from "../../../components/cards/ThirdBoxCard";

export interface IThirdBoxProps {}

function ThirdBox(props: IThirdBoxProps) {
  const arr = [{top:"HIGH",bottom:"SCHOOL",top2:"Teen Apparel",bottom2:"6-15 Shoes"}, {top:"MIDDLE",bottom:"SCHOOL",top2:"Kids and Young Adult Apparel",bottom2:"3.5Y-7Y Shoes"}, {top:"ELEM.",bottom:"SCHOOL",top2:"Kid's Apparel",bottom2:"10.5C-3Y Shoes"}];
  return (
    <div className="md:pr-[25px] md:pb-[64px] md:pl-[25px] pr-[40px] pl-[40px] pb-[20px] sm:pr-[120px] sm:pl-[120px] w-full md:h-[380px] h-auto md:mb-[50px] mb-[20px]">
      {/* Content */}
      
        <div className=" w-full h-full grid md:grid-cols-3  grid-cols-1 gap-4">
          {arr.map((item: any, index: any) => (
            <ThirdBoxCard item={item} key={index}/>
          ))}
        </div>
      
    </div>
  );
}

export default React.memo(ThirdBox);
