import React from "react";

import * as Icons from "lucide-react";

type DynamicIconProps = {
    iconName:string;
};

const DynamicIcon:React.FC<DynamicIconProps> = ({iconName}) => {

    console.log(iconName)
    const IconComponent = (Icons as any)[iconName];
    if(!IconComponent){
        return (<Icons.Watch />);
    }

    return (
        <IconComponent />
    );

};
export default DynamicIcon;
