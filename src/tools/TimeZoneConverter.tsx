import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns-tz';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const timeZoneNames = Intl.supportedValuesOf('timeZone');

const TimeZoneConverter: React.FC = () => {
    const { t } = useTranslation();
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>(['UTC', 'Asia/Tokyo']);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAddTimeZone = (_event: React.SyntheticEvent, newValue: string | null) => {
        if (newValue && !selectedTimeZones.includes(newValue)) {
            setSelectedTimeZones([...selectedTimeZones, newValue]);
        }
    };

    const handleRemoveTimeZone = (timeZoneToRemove: string) => {
        setSelectedTimeZones(selectedTimeZones.filter(tz => tz !== timeZoneToRemove));
    };

    return (
        <ToolPageLayout
            title={t('tools.time-zone-converter.name')}
            description={t('tools.time-zone-converter.description')}
        >
            <Autocomplete
                options={timeZoneNames}
                onChange={handleAddTimeZone}
                renderInput={(params) => <TextField {...params} label={t('tools.time-zone-converter.add_timezone_label')} />}
                sx={{ mb: 2 }}
            />
            <List>
                {selectedTimeZones.map(tz => {
                    const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss', { timeZone: tz });
                    const offset = format(currentTime, 'XXX', { timeZone: tz });

                    return (
                        <ListItem
                            key={tz}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTimeZone(tz)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" component="span">{tz.replace(/_/g, ' ')}</Typography>
                                        <Typography variant="h6" component="span">{`UTC${offset}`}</Typography>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body1" component="span" sx={{ fontFamily: 'monospace' }}>
                                        {formattedTime}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </ToolPageLayout>
    );
};

export default TimeZoneConverter;
