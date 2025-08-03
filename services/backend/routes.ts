import Item from '@/schemas/item';
import Paged from '@/schemas/paged';

// Route map for static paths
type StaticRoutes = {
	'/items': {
		GET: Paged<Item>;
		POST: Item;
	};
};

// Route map for dynamic paths
type DynamicRoutes = {
	[path in `/items/${string}`]: {
		GET: Item;
		PATCH?: Partial<Omit<Item, 'createdAt' | 'updatedAt' | 'id'>>;
		DELETE?: void;
	};
};

// Final route map combining both
export type ApiRouteMap = StaticRoutes & DynamicRoutes;
