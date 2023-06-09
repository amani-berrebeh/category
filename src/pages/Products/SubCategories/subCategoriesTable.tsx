import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import TableContainer from 'Common/TableContainer';
import { useDeleteSubCategoryMutation, useFetchSubCategoriesQuery, useUpdateSubCategoryMutation } from 'features/subCategory/subCategorySlice';

import { SubCategory } from 'features/subCategory/subCategorySlice';


const SubCategoriesTable = () => {
  const [updateSubCategory] = useUpdateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation()
  const {data, error, isLoading, isFetching, isSuccess} = useFetchSubCategoriesQuery();

  const deleteHandler = async (id: any) => {
    await deleteSubCategory(id);
  };



  const columns = useMemo(() => [
      {
        Header: "ID",
        
        accessor: "idSubCategory",
        Filter: true,
      },
      {
        Header: "Sous-category",
        accessor: "title",
        Filter: true,
      },
      {
        Header: "Category",
        accessor: "nom",
        Filter: true,
      },
      {
        Header: "Description",
        accessor: "subDescription",
        Filter: true
      },
      {
        Header: "Action",
        Filter: false,
        accessor: (subCategory: SubCategory) => {
          return (
            <span>
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link to="#" className="badge badge-soft-success" >Modifier</Link>
                </li>
                <li>
                  <Link to="/sub-categories" className="badge badge-soft-danger" onClick={()=>deleteHandler(subCategory.idSubCategory)}>Supprimer</Link>
                </li>
              </ul>
            </span>
          );
        },
      }
    ],
      []
    );



  return (
    <React.Fragment>
                  {error && <h2>Something went wrong!</h2>}
                  <div>
       <TableContainer
             columns={columns}
             data={(data || [])}
              isGlobalFilter={true}
             customPageSize={10}
              divClassName="table-responsive mb-1"
             tableClassName="gridjs-table"
             theadClassName="gridjs-thead"
            SearchPlaceholder='Search Products...'
           />
         </div> 
    </React.Fragment>
  );
};

export default SubCategoriesTable;