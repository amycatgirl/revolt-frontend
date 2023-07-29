import {
    BiLogosGithub,
    BiLogosTrello,
    BiRegularBug,
    BiRegularListOl,
    BiRegularText,
    BiSolidHappyBeaming,
    BiSolidMessage,
    BiSolidPalette,
} from "solid-icons/bi";

import { useTranslation } from "@revolt/i18n";
import { CategoryButton, CategoryCollapse, Checkbox, Column, Disabled, Row, styled } from "@revolt/ui";

/**
 * Accessibility
 */
export default function Accessibility() {
    const t = useTranslation();

    return (
        <Column gap="xl">
            <Disabled>
                <Column>
                    <CategoryButton
                        action={<Checkbox value onChange={(value) => void value} />}
                        description="Prefer this system's default font over the theme's font"
                        icon={<BiRegularText size={20} />}
                    >
                        Use System Font
                    </CategoryButton>
                    <CategoryButton
                        action={<Checkbox value onChange={(value) => void value} />}
                        description="Prefer this system's emoji over your selected emoji"
                        icon={<BiSolidHappyBeaming size={20} />}
                    >
                        Use System Emoji
                    </CategoryButton>
                </Column>
            </Disabled>
        </Column>
    );
}

/**
 * Link without decorations
 */
const Link = styled.a`
    text-decoration: none;
  `;
