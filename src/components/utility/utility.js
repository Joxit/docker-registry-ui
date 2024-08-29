// Copyright 2024 kmore
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './rectangle-styles.css';

export const COLORS = ['#E65C00', '#FF751A', '#FF944D', '#FFB380', '#FFD1B3'];
export const TOOLTIPS = ['Critical severity', 'High severity', 'Medium severity', 'Low severity', 'Unspecified severity']; // Define tooltips
export const SEVERITY_MAP = {};
      SEVERITY_MAP["UNSPECIFIED"] = 4;
      SEVERITY_MAP["LOW"] = 3;
      SEVERITY_MAP["MEDIUM"] = 2;
      SEVERITY_MAP["HIGH"] = 1;
      SEVERITY_MAP["CRITICAL"] = 0;
    
export async function fetchReport(family, image, tag) {
    const queryParams = new URLSearchParams({ family, image, tag }).toString();
    const backend_url = `https://ep-pokeball.netskope.io/api/report?${queryParams}`;
    console.log(backend_url);
    try {
      const response = await fetch(backend_url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
}

export function createRectanglesContainer(sevArray) {
    // Create rectangles container
    const rectContainer = document.createElement('div');
    rectContainer.classList.add('rect-container');
    sevArray.forEach((val, index) => {
      const rect = document.createElement('div');
      rect.classList.add('rectangle');
      rect.textContent = val === 0 ? null : val;
      rect.style.backgroundColor = COLORS[index];
      rect.setAttribute('data-tooltip', TOOLTIPS[index] || 'No tooltip');
      rectContainer.appendChild(rect);  
    });
    return rectContainer;
}