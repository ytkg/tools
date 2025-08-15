import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Alert } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

interface KeyboardEventInfo {
    key: string;
    code: string;
    keyCode: number;
    which: number;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}

const KeyboardEventViewer: React.FC = () => {
    const [eventInfo, setEventInfo] = useState<KeyboardEventInfo | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            setEventInfo({
                key: event.key,
                code: event.code,
                keyCode: event.keyCode,
                which: event.which,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <ToolPageLayout
            title="Keyboard Event Viewer"
            description="Display information about pressed keyboard keys (key, code, keyCode, etc.)."
        >
            <Box sx={{ p: 2, border: '2px dashed grey', borderRadius: 1, textAlign: 'center', mb: 2 }}>
                <Typography variant="h5">Press any key</Typography>
                <Typography variant="body1">The key event information will be displayed below.</Typography>
            </Box>

            {eventInfo ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Key: <Typography component="span" variant="h6" color="primary" sx={{ fontFamily: 'monospace' }}>{eventInfo.key}</Typography>
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(eventInfo).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                                {key}
                                            </TableCell>
                                            <TableCell>{String(value)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            ) : (
                <Alert severity="info">Waiting for a key press...</Alert>
            )}
        </ToolPageLayout>
    );
};

export default KeyboardEventViewer;
