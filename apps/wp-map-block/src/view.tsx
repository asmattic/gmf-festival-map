import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EmbeddedFestivalMap } from '@gmf/map-ui';

document.querySelectorAll( '[data-gmf-map-root]' ).forEach( ( node ) => {
	const raw = node.getAttribute( 'data-props' );
	const props = raw ? JSON.parse( raw ) : {};

	const client = new QueryClient( {
		defaultOptions: {
			queries: {
				retry: 2,
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 30,
				refetchOnWindowFocus: false,
			},
		},
	} );

	createRoot( node ).render(
		<QueryClientProvider client={ client }>
			<EmbeddedFestivalMap { ...props } />
		</QueryClientProvider>
	);
} );
