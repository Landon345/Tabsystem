import styled from "@emotion/styled";

export const Label = styled.label`
  font-size: 30px;
  text-align: left;
  color: white;
`;

export const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 10px 0px;
`;

export const FormInput = styled.input`
  padding-left: 20px;
  outline: none;
  border: 2px solid gray;
  border-radius: 20px;
  &:focus {
    border: 2px solid blue;
    border-color: ${(props) => props.theme.colors.first100};
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.first100};
  outline: none;
  color: white;
  padding: 5px 40px;
  border: 1px solid white;
  border-radius: 50px;
`;
