import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_s,
  spacer_m,
  spacer_xl,
  font_size_l,
  font_size_m,
  box_shadows,
  border_s,
} = styleVariables;

export const Card = styled.div`
border: ${border_s} solid var(--color-border);
box-shadow: ${box_shadows};
margin: ${spacer_m};
width:500px;
/* display: ${(props) => (props.progress ? "flex" : "")}; */
`;

export const CardContent = styled.div`
padding:${spacer_m}
`