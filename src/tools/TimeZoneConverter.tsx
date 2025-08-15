import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, toZonedTime } from 'date-fns-tz';
import ToolPageLayout from '../components/ToolPageLayout';

const timeZoneNames = Intl.supportedValuesOf('timeZone');

const TimeZoneConverter: React.FC = () => {
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
            title="Time Zone Converter"
            description="Compare and check the time in multiple cities around the world."
        >
            <Autocomplete
                options={timeZoneNames}
                onChange={handleAddTimeZone}
                renderInput={(params) => <TextField {...params} label="Add a time zone" />}
                sx={{ mb: 2 }}
            />
            <List>
                {selectedTimeZones.map(tz => {
                    const zonedTime = toZonedTime(currentTime, tz);
                    const formattedTime = format(zonedTime, 'yyyy-MM-dd HH:mm:ss');
                    const offset = format(zonedTime, 'XXX');

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
