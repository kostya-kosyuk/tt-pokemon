import classNames from "classnames";
import React from "react";

import './TypeItem.css';

type Props = {
    typeName: string,
    handleSelectType: (type: string) => void,
};

export const TypeItem: React.FC<Props> = ({typeName, handleSelectType}) => {
    return (
        <span className={classNames(`t-type type-${typeName}`)}>
            <a
                href={`#${typeName}`}
                title={`${typeName} type`}
                onClick={() => handleSelectType(typeName)}
            >
                <span className="t-type2">
                    {typeName}
                </span>
            </a>
        </span>
    );
};