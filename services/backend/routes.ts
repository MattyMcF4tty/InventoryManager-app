import Item from '@/schemas/item';
import Paged from '@/schemas/paged';
import Supplier from '@/schemas/supplier';

// Route map for static paths
type StaticRoutes = {
	'/items': {
		GET: Paged<Item>;
		POST: Item;
	};
};

// Route map for dynamic paths
type ItemRoutes = {
	[path in `/items/${string}`]: {
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
