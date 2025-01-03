export interface Time{
    value: number;
    unit: TimeUnit;
}

export enum TimeUnit{
    NANOS = "NANOS",
    MICROS = "MICROS",
    MILLIS = "MILLIS",
    SECONDS = "SECONDS",
    MINUTES = "MINUTES",
    HOURS = "HOURS",
    HALFDAYS = "HALFDAYS",
    DAYS = "DAYS",
    WEEKS = "WEEKS",
    MONTHS = "MONTHS",
    YEARS = "YEARS",
    DECADES = "DECADES",
    CENTURIES = "CENTURIES",
    MILLENNIA = "MILLENNIA",
    ERAS = "ERAS",
    FOREVER = "FOREVER"
}