"""ic-stm32-decoder: Zero-dependency IC Top Marking, Cross-Reference, Date Code & STM32 Decoder."""

from .cross_ref import VERIFIED_CROSS_REFERENCES, lookup_cross_reference
from .date_code import (
    NSC_SNOA039C_PERIODS,
    ONSEMI_AND8002_TABLE,
    ONSEMI_FIRST_LETTERS,
    decode_date_code,
    decode_national_six_week,
    decode_onsemi_two_letter,
    is_leap_year,
    iso_week_range,
    iso_weeks_in_year,
    lookup_national_period,
)
from .stm32 import (
    STM32_FAMILIES,
    STM32_GENERIC_TABLE,
    STM32_PRODUCT_TYPES,
    clean_stm32_input,
    decode_stm32,
)
from .top_marking import VERIFIED_TOP_MARKINGS, lookup_top_marking

__version__ = "1.5.0"

__all__ = [
    "__version__",
    "ONSEMI_FIRST_LETTERS",
    "ONSEMI_AND8002_TABLE",
    "NSC_SNOA039C_PERIODS",
    "is_leap_year",
    "iso_weeks_in_year",
    "iso_week_range",
    "decode_onsemi_two_letter",
    "lookup_national_period",
    "decode_national_six_week",
    "decode_date_code",
    "STM32_FAMILIES",
    "STM32_GENERIC_TABLE",
    "STM32_PRODUCT_TYPES",
    "clean_stm32_input",
    "decode_stm32",
    "VERIFIED_TOP_MARKINGS",
    "lookup_top_marking",
    "VERIFIED_CROSS_REFERENCES",
    "lookup_cross_reference",
]
