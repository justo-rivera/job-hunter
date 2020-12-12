import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_xs,
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  spacer_xxl,
  font_size_l,
  font_size_m,
  font_size_s,
  box_shadows,
  border_s,
  border_xl,
  rounded_corners_m,
  rounded_corners_l,
  small_circle,
} = styleVariables;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  padding: 15px 20px;
  pointer-events: none;
  margin-left: 5px;
`;

export const ProfilePic = styled.li`
  margin: ${spacer_l} ${spacer_xxl};
  border: 1px solid var(--color-border);
  padding: ${spacer_s};
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-primary);
  position:fixed;
  right:0;
`;

export const ToggleMenu = styled.img`

width:10px;
margin-right:10px;
`
