import 'rxjs';
import 'reflect-metadata';
import 'zone.js/dist/zone';
if (CONFIG_MODE === 'dev') {
    require('zone.js/dist/long-stack-trace-zone');
}
// Angular 2
import '@angular/platform-browser';
import '@angular/common';
import '@angular/core';
import '@angular/router';
import '@angular/http';