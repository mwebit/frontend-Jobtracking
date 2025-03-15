import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem
} from '@mui/material';
import { JobTrackingService } from '../services/JobTrackingService';

const STATUS_OPTIONS = [ 'Interview', 'Offer', 'Rejected'];

export default function JobTrackingDialog({ open, onClose, job }) {
    const [formData, setFormData] = useState({
        companyName: '',
        position: '',
        status: '',
        dateApplied: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (job) {
            setFormData({
                ...job,
                dateApplied: new Date(job.dateApplied).toISOString().split('T')[0]
            });
        }
    }, [job]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (job) {
                await JobTrackingService.updateJob({ ...formData, id: job.id });
            } else {
                await JobTrackingService.createJob(formData);
            }
            onClose();
        } catch (error) {
            console.error('Error saving job:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{job ? 'Edit Job' : 'Add New Job'}</DialogTitle>
            <DialogContent>
                <TextField
                    name="companyName"
                    label="Company Name"
                    fullWidth
                    margin="normal"
                    value={formData.companyName}
                    onChange={handleChange}
                />
                <TextField
                    name="position"
                    label="Position"
                    fullWidth
                    margin="normal"
                    value={formData.position}
                    onChange={handleChange}
                />
                <TextField
                    name="status"
                    label="Status"
                    select
                    fullWidth
                    margin="normal"
                    value={formData.status}
                    onChange={handleChange}
                >
                    {STATUS_OPTIONS.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="dateApplied"
                    label="Date Applied"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={formData.dateApplied}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {job ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}