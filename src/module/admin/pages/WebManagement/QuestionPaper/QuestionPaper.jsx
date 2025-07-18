import React, { useState, useEffect } from "react";
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  PdfLink,
  ActionsWrapper,
  EditButton,
  DeleteButton,
  CreateButton,
  ButtonContainer,
  Container,
  HeaderRow,
  Title
} from "../QuestionPaper/QuestionPaper.style";
import Pagination from "../../../component/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import {
  getAllQuestionPapers,
  deleteQuestionPaper
} from "../../../../../api/questionPaperApi";
import { notification } from "antd";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 8;

const QuestionPaper = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // helper ─ put this above the component or inside it
  const ts = (item) => {
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.updatedAt) return new Date(item.updatedAt).getTime();
    if (item._id && item._id.length >= 8) {
      return parseInt(item._id.substring(0, 8), 16) * 1000; // fallback
    }
    return 0;                       // unknown → oldest
  };

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestionPapers();
        const sorted = (response.data ?? response).sort((a, b) => ts(b) - ts(a));
        setData(sorted);

      } catch (error) {
        console.error("Error fetching question papers:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch question papers"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPapers();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteQuestionPaper(deleteId);
      setData((prev) =>
        prev
          .filter((item) => item._id !== deleteId)
          .sort((a, b) => ts(b) - ts(a))
      );
      toast.success("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting question paper:", error);
      toast.error("Failed to delete. Please try again");
    } finally {
      setModal(false);
      setDeleteId(null);
      setLoading(false);
    }
  };

  const handleViewClick = (row) => {
    navigate(`/admin/web-management/question-paper/view/${row._id}`);
  };

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />


      <ButtonContainer>
        <CreateButton onClick={() => navigate("/admin/web-management/question-paper/create")}>
          Add Question Paper
        </CreateButton>
      </ButtonContainer>

      <Container>
        <HeaderRow>
          <Title>All Question Papers</Title>
        </HeaderRow>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>View PDF</TableHeader>
                <TableHeader>Year</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {currentItems.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <PdfLink href={row.question_url} target="_blank" rel="noopener noreferrer">
                      View
                    </PdfLink>
                  </TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IoEyeOutline
                        title="View"
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewClick(row)}
                      />
                      <BiEditAlt
                        title="Edit"
                        size={20}
                        color="#000"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/admin/web-management/question-paper/edit/${row._id}`)}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        size={20}
                        color="#FB4F4F"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(row._id)}
                      />
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />

      </Container>

      {modal && (
        <DeleteModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onDelete={handleConfirmDelete}
          loading={loading}
        />
      )}
    </>
  );
};

export default QuestionPaper;
