// ==UserScript==
// @name         Shopify Order API Showcase
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Add buttons to open Shopify order, transaction, refund, and risk API links, show buttons only when mouse moves to the right side, and vertically center the buttons
// @author       MH
// @match        https://admin.shopify.com/store/*/orders/*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    // 等待页面加载完成后执行
    window.addEventListener('load', () => {
        // 获取当前 URL
        const url = window.location.href;

        // 使用正则表达式提取 store_key 和 order_id
        const match = url.match(/https:\/\/admin\.shopify\.com\/store\/([^\/]+)\/orders\/(\d+)/);
        if (match) {
            const store_key = match[1];
            const order_id = match[2];

            // 创建按钮容器
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.right = '35px';
            container.style.top = '50%';
            container.style.transform = 'translateY(-50%)';
            container.style.zIndex = '1000';
            container.style.display = 'none'; // 初始状态隐藏
            document.body.appendChild(container);

            // 创建按钮函数
            function createButton(text, url, color) {
                const button = document.createElement('button');
                button.textContent = text;
                button.style.display = 'block';
                button.style.width = '100px'; // 统一按钮宽度
                button.style.margin = '5px 0';
                button.style.padding = '10px';
                button.style.backgroundColor = color;
                button.style.color = '#fff';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';
                button.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
                return button;
            }

            // 创建 Order 按钮
            const orderButton = createButton('Order', `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}.json`, '#007bff');
            container.appendChild(orderButton);

            // 创建 Transaction 按钮
            const transactionButton = createButton('Transaction', `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}/transactions.json`, '#28a745');
            container.appendChild(transactionButton);

            // 创建 Refund 按钮
            const refundButton = createButton('Refund', `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}/refunds.json`, '#dc3545');
            container.appendChild(refundButton);

            // 创建 Risk 按钮
            const riskButton = createButton('Risk', `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}/risks.json`, '#ffc107');
            container.appendChild(riskButton);

            // 鼠标移动事件
            document.addEventListener('mousemove', (event) => {
                // 如果鼠标位于页面右侧 100px 以内，则显示按钮，否则隐藏
                if (window.innerWidth - event.clientX < 100) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        }
    });
})();
