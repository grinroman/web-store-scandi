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

const getSingleProduct = gql`
   query ($id: String!) {
      product(id: $id) {
         id
         name
         gallery
         description
         category
         attributes {
            id
            name
            type
            items {
               displayValue
               value
               id
            }
         }
         prices {
            currency {
               symbol
            }
            amount
         }
         brand
      }
   }
`;

export { getCategoriesTitles, getListProducts, getSingleProduct };
