import React, { useState, useMemo, useCallback } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { ListView } from "Common/data";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Charges,
  useGetOneChargesQuery,
  useGetAllChargesQuery,
  useAddChargeMutation,
  useUpdateChargeMutation,
  useDeleteChargesMutation,
} from "features/charge/chargeSlice";

const BrandsTable = () => {

    const notify = () => {
        toast.success("Le charge a été créé avec succès", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
const {data = []} = useGetAllChargesQuery()
      const [createCharge] = useAddChargeMutation();
  const [deleteCharge] = useDeleteChargesMutation();

  const deleteHandler = async (id: any) => {
    await deleteCharge(id);
  };

  const [formData, setFormData] = useState({
    idCharges: 99,
    typeCharges: "",
    montantCharges: 889,
    dateCharges: "",
    descriptionCharge: "",
    piecejointes: "",
  });

  const {
    typeCharges,
    montantCharges,
    dateCharges,
    descriptionCharge,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCharge(formData).then(() => setFormData(formData));
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filePJ = (
      document.getElementById("piecejointes") as HTMLInputElement
    ).files?.item(0) as File;

    const base64PJ = await convertToBase64(filePJ);

    setFormData({
      ...formData,
      piecejointes: base64PJ as string,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  function tog_AddUserModals() {
    setmodal_AddUserModals(!modal_AddUserModals);
  }

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkAll") as HTMLInputElement;
    const ele = document.querySelectorAll(".invoiceCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    checkedbox();
  }, []);

  const checkedbox = () => {
    const ele = document.querySelectorAll(".invoiceCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkAll"
              onClick={() => checkedAll()}
            />
          </div>
        ),
        Cell: (cellProps: any) => {
          return (
            <div className="form-check">
              <input
                className="invoiceCheckBox form-check-input"
                type="checkbox"
                name="chk_child"
                value={cellProps.row.original.id}
                onChange={() => checkedbox()}
              />
            </div>
          );
        },
        id: "#",
      },
      {
        Header: "ID",
        accessor: "idCharges",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Type Charges",
        disableFilters: true,
        filterable: true,
        accessor: "typeCharges"
      },
      {
        Header: "Montant Charges",
        accessor: "montantCharges",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "date Charges",
        accessor: "dateCharges",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "description Charge",
        accessor: "descriptionCharge",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Piece Jointe",
        disableFilters: true,
        filterable: true,
        accessor: (charge: Charges) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`data:image/jpeg;base64, ${charge.piecejointes}`}
                  alt=""
                  className="avatar-xs rounded-circle user-profile-img"
                />
              </div>
            </div>
          );
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (charge: Charges) => {
          return (
            <React.Fragment>
              <Dropdown>
                <Dropdown.Toggle
                  href="#!"
                  className="btn btn-soft-secondary btn-sm dropdown btn-icon arrow-none"
                >
                  <i className="ri-more-fill align-middle"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                  <li>
                    <Dropdown.Item href="/invoices-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted" />{" "}
                      Voir
                    </Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#" className="remove-list">
                      <i className="ri-pencil-fill align-bottom me-2 text-muted" />
                      Modifier
                    </Dropdown.Item>
                  </li>

                  <Dropdown.Divider />
                  <li>
                    <Dropdown.Item onClick={() => deleteHandler(charge.idCharges)} href="#" className="remove-list">
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />
                      Supprimer
                    </Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </React.Fragment>
          );
        },
      },
    ],
    [checkedAll]
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card id="invoiceList">
            <Card.Header className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Charges</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex gap-2 flex-wrap">
                    {isMultiDeleteButton && (
                      <Button variant="danger" className="btn-icon">
                        <i className="ri-delete-bin-2-line"></i>
                      </Button>
                    )}
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={tog_AddUserModals}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Ajouter
                      Charge
                    </Link>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="bg-soft-light border border-dashed border-start-0 border-end-0">
              <form>
                <Row className="g-3">
                  <Col xxl={5} sm={12}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search bg-light border-light"
                        placeholder="Search for customer, email, country, status or something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>

                  <Col xxl={3} sm={4}>
                    {/* <input type="text" className="form-control bg-light border-light" id="datepicker-range" placeholder="Select date" /> */}
                    <Flatpickr
                      className="form-control bg-light border-light"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>

                  {/* <Col xxl={3} sm={4}>
                    <div className="input-light">
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Status</option>
                        <option defaultValue="all">All</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="Cancel">Cancel</option>
                        <option value="Refund">Refund</option>
                      </select>
                    </div>
                  </Col> */}

                  {/* <Col xxl={1} sm={4}>
                    <Button variant="info" type="button" className="w-100">
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>{" "}
                      Filters
                    </Button>
                  </Col> */}
                </Row>
              </form>
            </Card.Body>
            <Card.Body>
              <div>
                <div className="table-responsive table-card">
                  <TableContainer
                    columns={columns || []}
                    data={data || []}
                    // isGlobalFilter={false}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Products..."
                  />
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ invoices We did not find
                        any invoices for you search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        className="fade"
        show={modal_AddUserModals}
        onHide={() => {
          tog_AddUserModals();
        }}
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title" id="exampleModalLabel">
            Ajouter Charge
          </h5>
        </Modal.Header>
        <Form className="tablelist-form" onSubmit={onSubmit}>
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <input type="hidden" id="id-field" />

            

            <div className="mb-3">
              <Form.Label htmlFor="typeCharges">type Charges</Form.Label>
              <Form.Control
                value={formData.typeCharges}
                onChange={onChange}
                type="text"
                id="typeCharges"
                placeholder="Enter typeCharges"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="montantCharges">montant Charges</Form.Label>
              <Form.Control
                type="text"
                id="montantCharges"
                placeholder="Enter Email"
                required
                value={formData.montantCharges}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="dateCharges">dateCharges</Form.Label>
              <Form.Control
                type="text"
                id="dateCharges"
                placeholder="Enter dateCharges"
                required
                value={formData.dateCharges}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="descriptionCharge">descriptionCharge</Form.Label>
              <Form.Control
                type="text"
                id="descriptionCharge"
                placeholder="Enter descriptionCharge"
                required
                value={formData.descriptionCharge}
                onChange={onChange}
              />
            </div>
            <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="avatar" className="form-label d-block">
                        Piece Jointes <span className="text-danger">*</span>
                      </label>

                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label
                            htmlFor="piecejointes"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Client Physique Avatar"
                          >
                            <span className="avatar-xs d-inline-block">
                              <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                <i className="ri-image-fill"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="piecejointes"
                            id="piecejointes"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e)}
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${formData.piecejointes}`}
                              alt=""
                              id="category-img"
                              className="avatar-md h-auto rounded-3 object-fit-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="error-msg mt-1">
                        Please add a category images.
                      </div>
                    </div>
                  </Col>
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_AddUserModals();
                }}
              >
                Close
              </Button>
              <Button type="submit" variant="success" id="add-btn" onClick={() => {
                     tog_AddUserModals()
                    }}>
                Add User
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default BrandsTable;
