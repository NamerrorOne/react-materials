import styled from "styled-components";

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

export interface WrapperProps {
  $isFetching: boolean;
}

export const Wrapper = styled.section<WrapperProps>`
  padding: 4em;
  background: papayawhip;
  opacity: ${(props) => (props.$isFetching ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$isFetching ? "none" : "auto")};
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
`;
