import * as React from 'react';
// import * as style from './style.css';

export namespace _SearchInput {
  export interface Props {
    value: string;
    className?: string;
    placeHolder?: string;
    inputStyle?: string;

    handleKeyChange: (value: string) => void;
  }
}

export const SearchInput: React.FC<_SearchInput.Props> = (props: _SearchInput.Props) => {
  const [inputValue, setInputValue] = React.useState<string>(String(props.value));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(e.target.value));
  };

  React.useEffect(() => {
    props.handleKeyChange(inputValue);
  }, [inputValue]);

  return (
    <React.Fragment>
      <div>
        <input
          placeholder={props.placeHolder}
          onChange={handleInputChange} 
          value={inputValue}>
        </input>
      </div>
    </React.Fragment>
  );
}