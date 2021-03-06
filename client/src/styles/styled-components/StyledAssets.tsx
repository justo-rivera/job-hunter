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
  width: ${props=>props.dashboard ? "100px" : "40px"};
  height: ${props=>props.dashboard ? "100px" : "40px"};
  padding: 15px 20px;
  pointer-events: none;
  margin-left: ${props=>props.dashboard ? "30px" : "10px"};
`;

export const ProfilePic = styled.img`
  margin: ${spacer_m} ${spacer_xxl};
  border: 1px solid var(--color-border);
  background-color: ${(props) => (props.active ? "var(--color-primary)" : "")};
  width: 45px;
  height: 45px;

  border-radius: 50%;
  cursor: pointer;
  color: ${(props) =>
    props.active ? "var(--color-bright)" : "var(--color-primary)"};
  position: ${(props) => (props.navBar ? "fixed" : "")};
  right: 0;
`;

export const ProfilePicEmpty = styled.li`
  margin: ${spacer_l} ${spacer_xxl};
  border: 1px solid var(--color-border);
  background-color: ${(props) => (props.active ? "var(--color-primary)" : "")};
  padding: ${spacer_s};

  border-radius: 50%;
  cursor: pointer;
  color: ${(props) =>
    props.active ? "var(--color-bright)" : "var(--color-primary)"};
  position: ${(props) => (props.navBar ? "fixed" : "")};
  right: 0;
`;

export const ToggleMenu = styled.img`
  width: 10px;
  margin-right: 10px;
`;

export const ToggleSideBar = styled.img`
  width: 20px;
  position: relative;
  left: 254px;
  top: -75px;
  z-index: 1000;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  padding: 5px;
  background-color: white;
  cursor:pointer;
`;
