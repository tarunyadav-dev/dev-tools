/**
 * rules.ts
 *
 * Every line-matching regex the lexer relies on, centralized so the grammar
 * is defined in exactly one place. The lexer imports these; it never inlines
 * a regex of its own.
 */

export const RULES = {
  heading: /^(#{1,4})\s+(.*)$/,
  horizontalRule: /^(?:-{3,}|\*{3,}|_{3,})\s*$/,
  blockquote: /^>\s?(.*)$/,
  unorderedListItem: /^(\s*)[-*+]\s+(.*)$/,
  orderedListItem: /^(\s*)\d+[.)]\s+(.*)$/,
  checklistItem: /^(\s*)[-*+]\s+\[([ xX])\]\s+(.*)$/,
  codeFence: /^```\s*([a-zA-Z0-9_-]*)\s*$/,
  tableRow: /^\s*\|(.*)\|\s*$/,
  tableSeparator: /^\s*\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/,
  directiveOpen: /^:::([a-zA-Z][a-zA-Z0-9_-]*)\s*$/,
  directiveClose: /^:::\s*$/,
  tabMarker: /^===\s+(.*)$/,
  image: /^!\[([^\]]*)\]\(([^)]+)\)\s*$/,
} as const;

export function isHeading(line: string) {
  return RULES.heading.exec(line);
}

export function isHorizontalRule(line: string) {
  return RULES.horizontalRule.test(line);
}

export function isCodeFenceStart(line: string) {
  return RULES.codeFence.exec(line);
}

export function isDirectiveOpen(line: string) {
  return RULES.directiveOpen.exec(line);
}

export function isDirectiveClose(line: string) {
  return RULES.directiveClose.test(line);
}

export function isTabMarker(line: string) {
  return RULES.tabMarker.exec(line);
}

export function isTableRow(line: string) {
  return RULES.tableRow.test(line);
}

export function isTableSeparator(line: string) {
  return RULES.tableSeparator.test(line);
}
