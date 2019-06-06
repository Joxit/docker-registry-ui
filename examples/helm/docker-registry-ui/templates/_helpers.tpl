{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "docker-registry-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "docker-registry-ui.fullname" -}}
{{- if .Values.ui.fullnameOverride -}}
{{- .Values.ui.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-ui" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-ui-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "docker-registry.fullname" -}}
{{- if .Values.registry.fullnameOverride -}}
{{- .Values.registry.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- printf "%s-registry" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-registry-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "docker-registry-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "docker-registry-ui.labels" -}}
app: registry-ui
chart: {{ include "docker-registry-ui.chart" . }}
release: {{ .Release.Name }}
{{- if .Chart.AppVersion }}
app/version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end -}}

{{- define "docker-registry-ui.matchLabels" -}}
app: registry-ui
release: {{ .Release.Name }}
{{- end -}}

{{- define "docker-registry.labels" -}}
app: registry
chart: {{ include "docker-registry-ui.chart" . }}
release: {{ .Release.Name }}
{{- if .Chart.AppVersion }}
app/version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end -}}

{{- define "docker-registry.matchLabels" -}}
app: registry
release: {{ .Release.Name }}
{{- end -}}

{{- define "docker-registry-ui.probes" -}}
{{- if and .Values.ui.probe.liveness (eq .Values.ui.probe.liveness true) -}}
livenessProbe:
  httpGet:
    path: /
    port: http
{{- end -}}
{{- if and .Values.ui.probe.readiness (eq .Values.ui.probe.readiness true) }}
readinessProbe:
  httpGet:
    path: /
    port: http
{{- end -}}
{{- end -}}

{{- define "docker-registry.probes" -}}
{{- if and .Values.registry.probe.liveness (eq .Values.registry.probe.liveness true) -}}
livenessProbe:
  httpGet:
    path: /v2/
    port: registry
{{- end -}}
{{- if and .Values.registry.probe.readiness (eq .Values.registry.probe.readiness true) }}
readinessProbe:
  httpGet:
    path: /v2/
    port: registry
{{- end -}}
{{- end -}}

{{- define "docker-registry-ui.url-name" -}}
{{- if eq .Values.ui.proxy true -}}
REGISTRY_URL
{{- else -}}
URL
{{- end -}}
{{- end -}}

{{- define "docker-registry-ui.url-value" -}}
{{- if eq .Values.registry.external true -}}
{{ .Values.registry.url }}
{{- else -}}
{{- $fullName := include "docker-registry.fullname" . -}}
{{ printf "http://%s.%s:%.0f" $fullName .Release.Namespace .Values.registry.service.port }}
{{- end -}}
{{- end -}}

{{- define "docker-registry-ui.pull" -}}
{{- if eq .Values.registry.external true -}}
{{ .Values.registry.url }}
{{- else -}}
{{- if eq .Values.ui.proxy true -}}
{{- if eq .Values.ui.ingress.enabled true -}}
{{- $host := index .Values.ui.ingress.hosts 0 -}}
{{ $host.host }}
{{- else -}}
{{- $fullName := include "docker-registry-ui.fullname" . -}}
{{ printf "%s.%s:%.0f" $fullName .Release.Namespace .Values.ui.service.port }}
{{- end -}}
{{- else -}}
{{- if eq .Values.registry.ingress.enabled true -}}
{{- $host := index .Values.registry.ingress.hosts 0 -}}
{{ $host.host }}
{{- else -}}
{{- $fullName := include "docker-registry.fullname" . -}}
{{ printf "%s.%s:%.0f" $fullName .Release.Namespace .Values.registry.service.port }}
{{- end -}}
{{- end -}}
{{- end -}}
{{- end -}}
