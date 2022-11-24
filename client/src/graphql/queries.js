import { gql } from '@apollo/client';

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

const getSingleCategory = gql`
   query ($category: CategoryInput) {
      category(input: $category) {
         name
         products {
            id
            name
            inStock
            gallery
            category
            attributes {
               id
               items {
                  value
                  id
               }
            }
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
            attributes {
               id
               items {
                  value
                  id
               }
            }
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
         inStock
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

export {
   getCategoriesTitles,
   getListProducts,
   getSingleProduct,
   getSingleCategory,
};
