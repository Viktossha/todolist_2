import React from 'react';

type ButtonPropsType = {
    btnTitle: string
    onClickHandler: () => void
    isDisabled?: boolean
}
export const Button:React.FC<ButtonPropsType> = ({btnTitle, onClickHandler, isDisabled}) => {
    return (
        <button disabled={isDisabled} onClick={onClickHandler}>{btnTitle}</button>
    );
};
