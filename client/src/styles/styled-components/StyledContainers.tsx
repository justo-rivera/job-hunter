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

export const PageContainer = styled.div`
  margin: ${spacer_xl};
  margin-top: ${(props) => (props.withSecondNav ? "100px" : "20px")};
  position: ${(props) => (props.withSecondNav ? "relative" : "")};
  /* z-index: ${(props) => (props.withSecondNav ? "8" : "10px")}; */

  display: ${(props) => (props.flex ? "flex" : "")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  justify-content: ${(props) =>
    props.even ? "space-evenly" : props.center ? "center" : "flex-start"};
  text-align: ${(props) => (props.textCenter ? "center" : "")};
  
`;

export const CardContainer = styled.div`
  width: ${(props) =>
    props.shorter
      ? "250px"
      : props.short
      ? "00px"
      : props.medium
      ? "400px"
      : props.large
      ? "800px"
      : "100%"};

  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: space-around;
  justify-content: ${(props) =>
    props.center
      ? "center"
      : props.even
      ? "evenly"
      : props.flexStart
      ? "flex-start"
      : "space-around"};

  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};

  border: ${(props) =>
    props.noBorder ? "none" : `${border_s} solid light-grey`};
  border-radius: ${rounded_corners_l};
  background-color:${props=>props.noBackground ? "" : "white"};
  box-shadow: ${(props) => (props.noShadow ? "" : box_shadows)};
  /* 
  border-radius: ${(props) =>
    props.inner ? rounded_corners_m : rounded_corners_l};
  margin: ${(props) => (props.inner ? spacer_xl : spacer_m)};
   */
`;

export const Card = styled.div`
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${(props) =>
    props.spaceBetween
      ? "space-between"
      : props.left
      ? "left"
      : props.center && props.flex
      ? "center"
      : ""};

  margin: ${(props) => (props.center ? "0 auto" : props.margin ? "20px" : "")};
  padding: ${(props) => (props.noPadding ? 0 : spacer_l)};
  box-shadow: ${(props) => (props.shadow ? box_shadows : "")};
  border: ${(props) =>
    props.noBorder ? "none" : `${border_s} solid var(--color-border)`};
  border-radius: ${(props) =>
    props.roundedCorners
      ? rounded_corners_m
      : props.roundedCornersLarge
      ? rounded_corners_l
      : ""};
  font-size: ${(props) => (props.smallFont ? "15px" : "")};
  width: ${(props) =>
    props.shorter || props.square
      ? "200px"
      : props.short
      ? "300px"
      : props.skills
      ? "372px"
      : props.medium
      ? "500px"
      : props.large
      ? "800px"
      : props.inner
      ? "90%"
      : "90%"};
  height: ${(props) =>
    props.shrinker
      ? "15px"
      : props.shrink
      ? "30px"
      :props.mediumShort 
      ?"125px"
      : props.shorter
      ? "150px"
      :props.square
      ? "200px"
      : props.taller
      ? "500px"
      : ""};
  max-width: ${(props) => (props.small ? "50%" : "")};
  /* max-height: ${(props) => (props.constrainMedium ? "1000px" : "")}; */
  background-color: ${(props) =>
    props.colored
      ? "var(--color-third)"
      : props.secondBg
      ? "var(--color-mellow)"
      : "white"};
  color: ${(props) => (props.colored ? "var(--color-primary)" : "")};
  a {
    color: ${(props) => (props.colored ? "var(--color-border)" : "")};
    overflow: ${(props) => (props.overflow ? "auto" : "")};
  }
  :hover {
    background-color: ${(props) =>
      props.skills ? "var(--color-secondary)" : ""};
  }
`;

export const CardContent = styled.div`
  padding: ${(props) =>
    props.paddingTop ? `${spacer_s} 0` : `${spacer_s} ${spacer_m}`};
  text-align: ${(props) => (props.centerText ? "center" : "")};
  width: ${(props) => (props.jobModal ? "900px" : "")};
  height: ${(props) => (props.jobModal ? "730px" : "")};
  border-radius: ${(props) => (props.jobModal ? rounded_corners_l : "")};
  overflow: ${(props) => (props.overflow ? "auto" : "")};
`;

export const Flex = styled.div`
  display: flex;
  position:${props=>props.absolute ? "absolute" : ""};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap:${props=>props.wrap ? "wrap" : ""};
  width: 100%;
  align-content: flex-start;
    justify-content: ${(props) =>
    props.flexEnd
      ? "flex-end"
      : props.flexStart
      ? "flex-start"
      : props.evenly
      ? "evenly"
      : props.spaceAround
      ? "space-around"
      : props.center
      ? "center"
      : "space-between"};
  margin-top: ${(props) =>
    props.todo ? "-5px" : props.jobOverview ? "-20px" : ""};
    overflow: ${(props) => (props.overflow ? "auto" : "")};
  margin-bottom: ${(props) => (props.todo ? "5px" : "")};
`;

export const CardFooter = styled.div`
  padding: 5px;
  text-align: center;
  border: 1px solid var(--color-border);
  border-radius:${rounded_corners_m};
  padding: ${(props) => (props.padding ? "10px" : "")};
  background-color: ${(props) =>
  props.background ? "var(--color-third)" : ""};
  display: ${(props) => (props.flex ? "flex" : "")};
  justify-content: ${(props) => (props.spaceAround ? "space-around" : "")
  };

`;
