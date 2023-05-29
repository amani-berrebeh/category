import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Produit,
  useAddProduitMutation,
  useDeleteProduitMutation,
  useFetchProduitsQuery,
} from "features/produit/productSlice";
import { useFetchCategoriesQuery } from "features/category/categorySlice";
import { useFetchFournisseurQuery } from "features/fournisseur/fournisseurSlice";

const CreateProduct = () => {
  const notify = () => {
    toast.success("Le produit a été créé avec succès", {
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

  const navigate = useNavigate();

  const { data = [] } = useFetchProduitsQuery();
  const { data: listeCategories = [] } = useFetchCategoriesQuery();
  const { data: listeFournisseur = [] } = useFetchFournisseurQuery();
  const [createProduct] = useAddProduitMutation();

  const [deleteProduct] = useDeleteProduitMutation();

  const deleteHandler = async (id: any) => {
    await deleteProduct(id);
  };

  const initialValue = {
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    prixAchatHt: 1234,
    prixAchatTtc: 1234,
    prixVente: 1234,
    remise: 15,
    remarqueProduit: "",
    nom: "",
    raison_sociale: "",
    fournisseurID: 1,
    categoryID: 5,
  };

  const [formData, setFormData] = useState(initialValue);
  const {
    nomProduit,
    imageProduit,
    marque,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise,
    remarqueProduit,
    nom,
    raison_sociale,
    fournisseurID,
    categoryID,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(formData).then(() => setFormData(formData));
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("image") as HTMLFormElement).files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setFormData({ ...formData, imageProduit: base64 as string });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1]; // Extract only the Base64 data

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  document.title = "CRÉER PRODUIT | Toner eCommerce + Admin React Template";

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /* Formats the size */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="CRÉER PRODUIT" pageTitle="Produits" />
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
            onSubmit={onSubmit}
          >
            <Row>
              <Col xl={9} lg={8}>
                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-box-seam"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Information produit</h5>
                        <p className="text-muted mb-0">
                          Remplissez toutes les informations ci-dessous.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Form.Label htmlFor="nomProduit">
                        Titre du produit
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="nomProduit"
                        placeholder="Enter product title"
                        required
                        onChange={onChange}
                        value={formData.nomProduit}
                      />

                      <div className="invalid-feedback">
                        Veuillez saisir le titre du produit.
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <Form.Label>Catégorie</Form.Label>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to="/categories"
                            className="float-end text-decoration-underline"
                          >
                            Ajouter Nouveau
                          </Link>
                        </div>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          id="choices-category-input"
                          name="choices-category-input"
                        >
                          <option value="">Select product category</option>
                          {listeCategories.map((category) => (
                            <option
                              key={category.idcategory}
                              value={formData.nom}
                            >
                              {category.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="error-msg mt-1">
                        Please select a product category.
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <Form.Label>Fournisseur</Form.Label>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to="/fournisseur"
                            className="float-end text-decoration-underline"
                          >
                            Ajouter Nouveau
                          </Link>
                        </div>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          id="choices-fournisseur-input"
                          name="choices-fournisseur-input"
                        >
                          <option value="">Select product fournisseur</option>
                          {listeFournisseur.map((fournisseur) => (
                            <option
                              key={fournisseur.idfournisseur}
                              value="Appliances"
                            >
                              {fournisseur.raison_sociale}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="error-msg mt-1">
                        Please select a product category.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-images"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Product Gallery</h5>
                        <p className="text-muted mb-0">
                          Add product gallery images.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="dropzone my-dropzone">
                      <div className="text-center mb-3">
                        <div className="position-relative d-inline-block">
                          <div className="position-absolute top-100 start-100 translate-middle">
                            <label
                              htmlFor="image"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Fournisseur Logo"
                            >
                              <span className="avatar-xs d-inline-block">
                                <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                  <i className="ri-image-fill"></i>
                                </span>
                              </span>
                            </label>
                            <input
                              className="d-none"
                              type="file"
                              name="image"
                              id="image"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div>
                          <div className="avatar-lg p-1">
                            <div className="avatar-title bg-light rounded-circle">
                              <img
                                src={`data:image/jpeg;base64, ${formData.imageProduit}`}
                                alt={formData.nomProduit}
                                id="category-img"
                                className="avatar-md h-auto rounded-3 object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="error-msg mt-1">
                      Please add a product images.
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-list-ul"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">General Information</h5>
                        <p className="text-muted mb-0">
                          Fill all information below.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="marque">marque</Form.Label>
                          <Form.Control
                            type="text"
                            id="marque"
                            placeholder="Enter marque"
                            value={formData.marque}
                            onChange={onChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="remarqueProduit">
                            Remarque
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="remarqueProduit"
                            placeholder="Enter remarqueProduit"
                            value={formData.remarqueProduit}
                            onChange={onChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatHt">
                            prixAchatHt
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={formData.prixAchatHt}
                              onChange={onChange}
                              id="prixAchatHt"
                              placeholder="Enter price"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatTtc">
                            prixAchatTtc
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="prixAchatTtc"
                            placeholder="Stocks"
                            required
                            onChange={onChange}
                            value={formData.prixAchatTtc}
                          />
                          <div className="invalid-feedback">
                            Please enter a product stocks.
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixVente">prixVente</Form.Label>
                          <Form.Control
                            type="text"
                            id="prixVente"
                            placeholder="prixVente"
                            required
                            value={formData.prixVente}
                            onChange={onChange}
                          />
                          <div className="invalid-feedback">
                            Please enter a product orders.
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="remise">remise</Form.Label>
                          <div className="input-group has-validation mb-3">
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <Form.Control
                              type="text"
                              value={formData.remise}
                              onChange={onChange}
                              id="remise"
                              placeholder="Enter discount"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter a product discount.
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <div className="text-end mb-3">
                  <Button variant="success" type="submit" className="w-sm">
                    Ajouter
                  </Button>
                </div>
              </Col>

              {/* <Col xl={3} lg={4}>
                <Card>
                  <Card.Header>
                    <h5 className="card-title mb-0">Publish</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <label
                        htmlFor="choices-publish-status-input"
                        className="form-label"
                      >
                        Status
                      </label>

                      <select
                        className="form-select"
                        id="choices-publish-status-input"
                        data-choices
                        data-choices-search-false
                      >
                        <option defaultValue="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>

                    <div>
                      <Form.Label htmlFor="choices-publish-visibility-input">
                        Visibility
                      </Form.Label>
                      <select
                        className="form-select"
                        id="choices-publish-visibility-input"
                        data-choices
                        data-choices-search-false
                      >
                        <option defaultValue="Public">Public</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <h5 className="card-title mb-0">Publish Schedule</h5>
                  </Card.Header>

                  <Card.Body>
                    <div>
                      <Form.Label htmlFor="datepicker-publish-input">
                        Publish Date & Time
                      </Form.Label>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Enter publish date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <h5 className="card-title mb-0">Product Tags</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="hstack gap-3 align-items-start">
                      <div className="flex-grow-1">
                        <Form.Control
                          data-choices
                          data-choices-multiple-remove="true"
                          placeholder="Enter tags"
                          type="text"
                          defaultValue="Cotton"
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <h5 className="card-title mb-0">
                      Product Short Description
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-2">
                      Add short description for product
                    </p>
                    <textarea
                      className="form-control"
                      placeholder="Must enter minimum of a 100 characters"
                      rows={3}
                    ></textarea>
                  </Card.Body>
                </Card>
              </Col> */}
            </Row>
          </form>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default CreateProduct;