import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

interface IpInfo {
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    country_name: string;
    country_code: string;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    org: string;
    asn: string;
}

const IpAddressViewer: React.FC = () => {
    const { t } = useTranslation();
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userAgent = navigator.userAgent;

    useEffect(() => {
        const fetchIpInfo = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) {
                    throw new Error(t('tools.ip-address-viewer.error_fetch'));
                }
                const data: IpInfo = await response.json();
                setIpInfo(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(t('tools.ip-address-viewer.error_unknown'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchIpInfo();
    }, [t]);

    const getLabel = (key: string) => {
        return t(`tools.ip-address-viewer.ip_info_labels.${key}`, { defaultValue: key.replace(/_/g, ' ') });
    }

    return (
        <ToolPageLayout
            title={t('tools.ip-address-viewer.name')}
            description={t('tools.ip-address-viewer.description')}
        >
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{t('tools.ip-address-viewer.user_agent_title')}</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                        {userAgent}
                    </Typography>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{t('tools.ip-address-viewer.ip_info_title')}</Typography>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {error && <Alert severity="error">{error}</Alert>}
                    {ipInfo && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {Object.entries(ipInfo).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                                {getLabel(key)}
                                            </TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </ToolPageLayout>
    );
};

export default IpAddressViewer;
