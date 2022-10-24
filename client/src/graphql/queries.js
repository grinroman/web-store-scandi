import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getCategoriesTitles = gql`
   {
      currencies {
         label
         symbol
      }
      categories {
         name
      }
   }
`;

const getListProducts = gql`
   {
      category {
         name
         products {
            id
            name
            inStock
            gallery
            category
            prices {
               amount
               currency {
                  symbol
               }
            }
            brand
         }
      }
   }
`;

export { getCategoriesTitles, getListProducts };
