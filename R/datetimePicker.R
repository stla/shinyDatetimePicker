datetime2list <- function(dt, sec){
  list(
    date = list(
      year = year(dt),
      month = month(dt),
      date = day(dt)
    ),
    time = if(sec) list(
      hour = hour(dt),
      minute = minute(dt),
      second = floor(second(dt))
    ) else list(
      hour = hour(dt),
      minute = minute(dt)
    )
  )
}

#' Datetime picker
#'
#' A datetime picker for a Shiny UI.
#'
#' @param inputId the input slot that will be used to access the value
#' @param value initial value of the datetime picker; if \code{NULL}, the
#'   initial value is set to the system time
#' @param second logical, whether to enable the second picker
#' @param save logical, whether to enable the 'save' button
#'
#' @importFrom reactR createReactShinyInput
#' @importFrom htmltools htmlDependency tags
#' @import lubridate
#'
#' @export
datetimePickerInput <- function(
  inputId, value = NULL,
  second = FALSE, save = FALSE)
{

  if(is.null(value)) {
    value <- Sys.time()
  }

  reactR::createReactShinyInput(
    paste0(inputId, "-input"),
    "datetimePicker",
    htmltools::htmlDependency(
      name = "datetimePicker-input",
      version = "1.0.0",
      src = "www/shinyDatetimePicker/datetimePicker",
      package = "shinyDatetimePicker",
      script = "datetimePicker.js",
      stylesheet = c("Calendar.css", "TimePicker.css", "Picker.css")
    ),
    datetime2list(value, second),
    list(shinyId = inputId, second = second, save = save),
    htmltools::tags$div
  )
}

#' <Add Title>
#'
#' <Add Description>
#'
#' @export
updateDatetimePickerInput <- function(session, inputId, value, configuration = NULL) {
  message <- list(value = value)
  if (!is.null(configuration)) message$configuration <- configuration
  session$sendInputMessage(inputId, message);
}
