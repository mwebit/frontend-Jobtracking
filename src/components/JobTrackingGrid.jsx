import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { JobTrackingService } from '../services/JobTrackingService';
import JobTrackingDialog from './JobTrackingDialog';

export default function JobTrackingGrid() {
    const [rows, setRows] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(false);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'position', headerName: 'Position', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        {
            field: 'dateApplied',
            headerName: 'Date Applied',
            width: 200,
            renderCell: (params) => new Date(params.value).toLocaleDateString(),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(params.row)}
                        color="primary"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                        color="error"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const jobs = await JobTrackingService.getAllJobs();
            setRows(jobs);
        } catch (error) {
            console.error('Error loading jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedJob(null);
        setOpenDialog(true);
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await JobTrackingService.deleteJob(id);
                await loadJobs();
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        loadJobs();
    };

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Job
                </Button>
            </Stack>

            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    loading={loading}
                    autoHeight
                    sx={{
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <JobTrackingDialog
                open={openDialog}
                onClose={handleDialogClose}
                job={selectedJob}
            />
        </div>
    );
}