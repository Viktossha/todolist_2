import React from 'react';

type ButtonPropsType = {
    btnTitle: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string
}
export const Button:React.FC<ButtonPropsType> = ({btnTitle, onClickHandler, isDisabled, classes}) => {
    return (
        <button className={classes} disabled={isDisabled} onClick={onClickHandler}>{btnTitle}</button>
    );
};
