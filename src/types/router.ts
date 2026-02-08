/**
 * Router and route-related types
 */

import 'vue-router';

/**
 * Layout types for different page layouts
 */
export type LayoutType = 'default' | 'blank';

/**
 * Route access mode
 */
export type RouteMode = 'public' | 'private';

/**
 * Extended route meta interface with type safety
 */
declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Page title for document title
     */
    title?: string;

    /**
     * Layout type to use for this route
     * - 'default': Standard layout with header/footer
     * - 'blank': Minimal layout (for public forms, login, etc.)
     */
    layout?: LayoutType;

    /**
     * Route access mode
     * - 'public': Accessible without authentication
     * - 'private': Requires authentication (default if not specified)
     */
    mode?: RouteMode;

    /**
     * Only accessible to guests (not authenticated users)
     * Redirects authenticated users to home
     */
    guestOnly?: boolean;

    /**
     * Use fixed viewport width (1024px) on mobile to zoom out
     * and show desktop layout instead of responsive shrink
     */
    fixedViewport?: boolean;
  }
}
