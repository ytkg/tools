import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Alert } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
            title={t('tools.keyboard-event-viewer.name')}
            description={t('tools.keyboard-event-viewer.description')}
        >
            <Box sx={{ p: 2, border: '2px dashed grey', borderRadius: 1, textAlign: 'center', mb: 2 }}>
                <Typography variant="h5">{t('tools.keyboard-event-viewer.press_any_key')}</Typography>
                <Typography variant="body1">{t('tools.keyboard-event-viewer.info_will_be_displayed')}</Typography>
            </Box>

            {eventInfo ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {t('tools.keyboard-event-viewer.key_label')} <Typography component="span" variant="h6" color="primary" sx={{ fontFamily: 'monospace' }}>{eventInfo.key}</Typography>
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(eventInfo).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                                {t(`tools.keyboard-event-viewer.event_info_labels.${key}`, { defaultValue: key })}
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
                <Alert severity="info">{t('tools.keyboard-event-viewer.waiting_for_press')}</Alert>
            )}
        </ToolPageLayout>
    );
};

export default KeyboardEventViewer;
