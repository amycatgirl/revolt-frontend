import { JSXElement } from "solid-js";
import { styled } from "solid-styled-components";

import { Initials } from "./Initials";

export type Props = {
  /**
   * Avatar size
   */
  size?: number;

  /**
   * Image source
   */
  src?: string;

  /**
   * Fallback if no source
   */
  fallback?: string | JSXElement;

  /**
   * Punch a hole through the avatar
   */
  holepunch?:
    | "bottom-right"
    | "top-right"
    | "right"
    | "overlap"
    | "overlap-subtle"
    | "none"
    | false;

  /**
   * Specify overlay component
   */
  overlay?: JSXElement;

  /**
   * Whether this icon is interactive
   */
  interactive?: boolean;

  /**
   * Whether to show cat ears behind the avatar
   */
  cat?: boolean;
};

/**
 * Avatar image
 */
const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

/**
 * Text fallback container
 */
const FallbackBase = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ theme }) => theme!.colours["foreground"]};
  background: ${({ theme }) => theme!.colours["background-200"]};
`;

/**
 * Avatar parent container
 */
const ParentBase = styled("svg", "Avatar")<Pick<Props, "interactive" | "cat">>`
  flex-shrink: 0;
  user-select: none;
  overflow: visible !important;
  cursor: ${(props) => (props.interactive ? "cursor" : "inherit")};

  foreignObject {
    ${props => props.cat ? "overflow: visible !important;" : ""}
    transition: ${(props) => props.theme!.transitions.fast} filter;
  }

  &:hover foreignObject {
    filter: ${(props) => (props.interactive ? "brightness(0.8)" : "unset")};
  }
  ${props => props.cat ? `    
    foreignObject:before {
      left: 0;
      border-radius: 25% 75% 75%;
      transform: rotate(37.5deg) skew(30deg);
    }

    foreignObject:after { 
      right: 0;
      border-radius: 75% 25% 75% 75%;
      transform: rotate(-37.5deg) skew(-30deg);
    }

    foreignObject:before, foreignObject:after {  
      position: absolute;
      z-index: -1;
      background: #ebbcba;
      border: solid 4px rgb(163, 132, 145);
      box-sizing: border-box;
      content: "";
      display: inline-block;
      height: 50%;
      width: 50%;
    }
  ` : ""}
`;

/**
 * Generic Avatar component
 *
 * Partially inspired by Adw.Avatar API, we allow users to specify a fallback component (usually just text) to display in case the URL is invalid.
 */
export function Avatar(props: Props) {
  return (
    <ParentBase
      width={props.size}
      height={props.size}
      viewBox="0 0 32 32"
      cat={props.cat}
      interactive={props.interactive}
    >
      <foreignObject
        x="0"
        y="0"
        width="32"
        height="32"
        // @ts-expect-error Solid.js typing issue
        mask={
          props.holepunch ? `url(#holepunch-${props.holepunch})` : undefined
        }
      >
        {props.src && <Image src={props.src} />}
        {!props.src && (
          <FallbackBase>
            {typeof props.fallback === "string" ? (
              <Initials input={props.fallback} maxLength={2} />
            ) : (
              props.fallback
            )}
          </FallbackBase>
        )}
      </foreignObject>
      {props.overlay}
    </ParentBase>
  );
}
