# Insta-clone Styling Rules

## 1. File Placement Rules
- Global styling entry is in client/src/features/shared/styles/global.scss and is imported once in client/src/App.jsx.
- Shared reusable styles live in client/src/features/shared/styles.
- Feature-specific styles are colocated under each feature:
  - client/src/features/auth/styles
  - client/src/features/post/styles
  - client/src/features/user/styles
- Reusable style primitives are kept in partials like client/src/features/shared/styles/_mixins.scss.

## 2. Naming Rules
- React component files use PascalCase naming, for example Navbar.jsx and NotFoundPage.jsx.
- SCSS files use kebab-case naming, for example create-post.scss and user-list-card.scss.
- SCSS partials use underscore prefix, for example _mixins.scss.
- CSS class names are primarily kebab-case, with optional modifier pattern using double hyphen, for example active-user--loading.

## 3. Import Rules
- Each page or component imports its own style file.
- Shared style dependencies are composed through SCSS @use.
- Shared button styles are pulled through global.scss.
- Feature styles consume shared mixins through relative @use paths.

## 4. Layout and Composition Rules
- Flex layout is standardized through displayFlex mixin in _mixins.scss.
- Nested SCSS structure mirrors JSX hierarchy.
- List UIs share wrappers and card patterns:
  - client/src/features/shared/styles/user-list-wrapper.scss
  - client/src/features/shared/styles/user-list-card.scss

## 5. Theme Rules
- Base background is dark: #0C1014.
- Primary text color is whitesmoke.
- Accent color is red: #e33434.
- Accent is used across primary buttons, links, and interactive highlights.

## 6. Button System Rules
- Base reusable class is button.
- Variants include:
  - primary-button
  - secondary-button
  - small-button
- State styling includes disabled style using disabled attribute and matching SCSS.

## 7. Typography and Spacing Rules
- Global font stack is defined in global.scss.
- Common spacing scale used across components: 0.5rem, 1rem, 1.5rem, 2rem.
- Common border radius values: 10px and 50 percent for circular avatars.

## 8. Data-Safe UI Rules
- Guard null and undefined values before list rendering.
- Show explicit loading and empty states for list components.
- Long user-generated text should use wrapping rules for bio and captions.

## 9. Data Key Consistency Rules
- Keep backend response keys and frontend state keys identical:
  - followingRecords
  - followerRecords
- Avoid key typos between controller response, hook mapping, and UI access.

## 10. Naming Consistency Gap
- Follow component folders currently mix naming styles with underscores.
- Recommended standard is kebab-case folder names:
  - follow-request
  - follow-unfollow-buttons
