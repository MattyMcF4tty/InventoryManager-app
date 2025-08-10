import Item from '@/schemas/item';
import Paged from '@/schemas/paged';
import Supplier from '@/schemas/supplier';

// Route map for static paths
type StaticRoutes = {
	'/items': {
		GET: Paged<Item>;
		POST: Item;
	};
	'/items/search': {
		GET: Paged<Item>;
	};
};

// Route map for dynamic item paths, excluding the literal '/items/search'
type ItemRoutes = {
	[P in `/items/${string}` as P extends '/items/search' ? never : P]: {
		GET: Item;
		PATCH: Item;
		DELETE: void;
	};
};

type SupplierRoutes = {
	[path in `/suppliers/${string}`]: {
		GET: Supplier;
	};
};

type DynamicRoutes = ItemRoutes & SupplierRoutes;

// Final route map combining both
export type ApiRouteMap = StaticRoutes & DynamicRoutes;
